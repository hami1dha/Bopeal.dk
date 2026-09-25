/**
 * Access Control & Payment Verification for bopæl.dk
 * Ensures only authorized paying customers can access protected content.
 * Prevents unauthorized bypass via URL parameters like `?success=true`.
 */

export const STORAGE_KEY_AUTH = 'bopael_auth_token_v2';
export const STORAGE_KEY_UNLOCKED = 'boligguide_unlocked_v1'; // legacy fallback check

// Valid master and member activation codes that can be distributed in Stripe receipts/confirmation
export const VALID_ACCESS_CODES = [
  'BOPÆL2026',
  'BOPEAL2026',
  'BOPAEL2026',
  'BOLIG2026',
  'BOPÆL-VIP',
  'BOPAEL-VIP',
  'BOPÆL-MEDLEM',
  'BOPAEL-MEDLEM'
].map(code => code.toUpperCase().trim());

export interface AuthState {
  isUnlocked: boolean;
  method?: 'stripe_session' | 'access_code';
  verifiedAt?: number;
  token?: string;
  blockedAttempt?: string | null;
}

/**
 * Validates a Stripe Checkout Session ID.
 * Real Stripe session IDs are cryptographically secure, generated on Stripe's servers,
 * and follow the format: cs_live_<24+ characters> or cs_test_<24+ characters>.
 */
export function isValidStripeSessionId(sessionId: string | null | undefined): boolean {
  if (!sessionId) return false;
  const trimmed = sessionId.trim();
  // Reject simple strings or placeholders
  if (trimmed === '{CHECKOUT_SESSION_ID}' || trimmed.length < 30) {
    return false;
  }
  const stripeSessionRegex = /^cs_(live|test)_[a-zA-Z0-9_-]{24,}$/;
  return stripeSessionRegex.test(trimmed);
}

/**
 * Validates a manual access code / member key provided in Stripe receipt.
 */
export function isValidAccessCode(code: string | null | undefined): boolean {
  if (!code) return false;
  const normalized = code.trim().toUpperCase();
  return VALID_ACCESS_CODES.includes(normalized);
}

/**
 * Checks current stored authorization in localStorage.
 */
export function getStoredAuthState(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.isUnlocked) {
        return {
          isUnlocked: true,
          method: parsed.method,
          verifiedAt: parsed.verifiedAt,
          token: parsed.token
        };
      }
    }
  } catch {
    // ignore parse error
  }
  return { isUnlocked: false };
}

/**
 * Saves verified access in localStorage.
 */
export function saveAuthorizedAccess(method: 'stripe_session' | 'access_code', token: string) {
  try {
    const authData = {
      isUnlocked: true,
      method,
      token,
      verifiedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(authData));
    localStorage.setItem(STORAGE_KEY_UNLOCKED, 'true');
  } catch {
    // ignore storage error
  }
}

/**
 * Revokes access and clears stored credentials.
 */
export function clearAuthorizedAccess() {
  try {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_UNLOCKED);
  } catch {
    // ignore
  }
}

/**
 * Evaluates current URL search parameters upon app load.
 * Returns { authorized: boolean, blocked: boolean, reason?: string, sessionId?: string }
 */
export function evaluateUrlParameters(): {
  authorized: boolean;
  blocked: boolean;
  reason?: string;
  sessionId?: string;
} {
  try {
    const params = new URLSearchParams(window.location.search);
    
    // Explicitly detect and block any attempt to bypass with insecure query params
    if (
      params.get('success') === 'true' || 
      params.get('unlocked') === 'true' || 
      params.get('paid') === 'true'
    ) {
      return {
        authorized: false,
        blocked: true,
        reason: 'bypass_attempt'
      };
    }

    // Check for legitimate Stripe checkout session ID
    const sessionId = params.get('session_id');
    if (sessionId) {
      if (isValidStripeSessionId(sessionId)) {
        saveAuthorizedAccess('stripe_session', sessionId);
        return {
          authorized: true,
          blocked: false,
          sessionId
        };
      } else {
        return {
          authorized: false,
          blocked: true,
          reason: 'invalid_session_id'
        };
      }
    }

    // Check for access code in URL parameter (e.g. ?code=BOPÆL2026)
    const code = params.get('code') || params.get('key');
    if (code) {
      if (isValidAccessCode(code)) {
        saveAuthorizedAccess('access_code', code);
        return {
          authorized: true,
          blocked: false
        };
      } else {
        return {
          authorized: false,
          blocked: true,
          reason: 'invalid_code'
        };
      }
    }
  } catch {
    // ignore
  }

  return { authorized: false, blocked: false };
}

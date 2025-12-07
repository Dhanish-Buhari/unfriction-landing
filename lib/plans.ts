/**
 * Plan management utilities
 * Defines plan types, limits, and helper functions
 */

export type PlanType = 'free' | 'lifetime' | 'pro'

export interface PlanLimits {
  notesLimit: number
  ocrLimit: number
  plan: PlanType
  isEarlyAdopter: boolean
}

/**
 * Get plan limits based on plan type
 */
export function getPlanLimits(plan: PlanType): PlanLimits {
  switch (plan) {
    case 'free':
      return {
        plan: 'free',
        notesLimit: 50,
        ocrLimit: 10,
        isEarlyAdopter: false,
      }

    case 'lifetime':
      return {
        plan: 'lifetime',
        notesLimit: 999999, // Unlimited
        ocrLimit: 999999, // Unlimited
        isEarlyAdopter: true,
      }

    case 'pro':
      return {
        plan: 'pro',
        notesLimit: 999999, // Unlimited
        ocrLimit: 999999, // Unlimited
        isEarlyAdopter: false,
      }

    default:
      return getPlanLimits('free')
  }
}

/**
 * Check if user has access to a feature based on plan
 */
export function hasFeatureAccess(
  plan: PlanType,
  feature: 'unlimited_notes' | 'unlimited_ocr' | 'export' | 'cloud_sync'
): boolean {
  switch (feature) {
    case 'unlimited_notes':
    case 'unlimited_ocr':
      return plan === 'lifetime' || plan === 'pro'

    case 'export':
      return plan !== 'free' // All paid plans get export

    case 'cloud_sync':
      return plan === 'pro' // Only Pro gets cloud sync

    default:
      return false
  }
}

/**
 * Format plan name for display
 */
export function formatPlanName(plan: PlanType): string {
  switch (plan) {
    case 'free':
      return 'Free'
    case 'lifetime':
      return 'Lifetime'
    case 'pro':
      return 'Pro'
    default:
      return 'Free'
  }
}


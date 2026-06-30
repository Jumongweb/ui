/**
 * Sorokit UI - React components for Stellar/Soroban development
 * 
 * @packageDocumentation
 * 
 * @example
 * ```tsx
 * import { SorokitProvider, SorobanPanel } from 'sorokit-ui';
 * 
 * export function App() {
 *   return (
 *     <SorokitProvider>
 *       <SorobanPanel />
 *     </SorokitProvider>
 *   );
 * }
 * ```
 */

// Export all components
export { SorobanPanel } from './SorobanPanel';
export { TransactionPanel } from './TransactionPanel';
export { ErrorBoundary } from './ErrorBoundary';
export type { ErrorBoundaryProps } from './ErrorBoundary';
export { FeeEstimator } from './FeeEstimator';
export type { FeeEstimatorProps } from './FeeEstimator';
export { ContractEventFeed } from './ContractEventFeed';
export type { ContractEventFeedProps } from './ContractEventFeed';

// Export UI primitives
export { Separator } from './ui/Separator';
export { Skeleton, SkeletonRow, SkeletonCard, AssetRowSkeleton } from './ui/Skeleton';
export type { SkeletonProps } from './ui/Skeleton';

// Export providers and hooks
export { SorokitProvider } from '../context/SorokitProvider';
export { useSorokit } from '../context/useSorokit';

// Export types
export type { SorokitClient, Transaction, ContractEvent } from '../lib/client';

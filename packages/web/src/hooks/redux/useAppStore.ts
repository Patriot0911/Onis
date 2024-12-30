import type { AppStore } from '@/redux/store';
import { useStore } from 'react-redux';

export const useAppStore = useStore.withTypes<AppStore>();

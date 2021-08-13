import { ref, watch, computed } from '@vue/composition-api';
import apiClient from '../lib/apiClient'

export const useGetCharacters = () => {
  const characters = ref([]);
  const loading = ref(true);
  const count = computed(() => characters.value.length);
  watch(
    () => count,
    async () => {
      const data = await apiClient({
        url: '/character'
      })
      
      characters.value = data.posts;
      loading.value = false;
    });

  return { count, characters, loading };
};
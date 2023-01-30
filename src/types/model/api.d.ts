import { Ref } from 'vue'

declare interface UseFetchResult<T> {
  result: Ref<T>
  loading: Ref<boolean>
  isError: Ref<boolean>
  doFetch: Function
}

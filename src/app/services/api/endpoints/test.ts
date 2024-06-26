
import { designPlatformApi } from "..";

const extendedApi = designPlatformApi.injectEndpoints({
  endpoints: (builder) => ({
    getTest: builder.query<number, void>({
      query: () => `/role/getall`,
    }),
  }),
  overrideExisting: false,
});

export const {
    useGetTestQuery,
    useLazyGetTestQuery,
} = extendedApi;
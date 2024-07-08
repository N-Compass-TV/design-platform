import { designPlatformApi } from "..";
import { UpdateNewsTemplateModel } from "../../../models/UpdateNewsTemplateModel";
import { NewsTemplateType } from "../../../types/NewsTemplateTypes";

const extendedApi = designPlatformApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewsTemplateById: builder.query<NewsTemplateType, string>({
      query: (id) => `/NewsTemplate/${id}`,
    }),
    getAllNewsTemplate: builder.query<NewsTemplateType[], void>({
      query: () => `/NewsTemplate`,
    }),
    putNewsTemplateById: builder.mutation<NewsTemplateType, UpdateNewsTemplateModel>({
      query: (model) => ({
        url: `/NewsTemplate/${model.newsTemplateId}`,
        method: "PUT",
        body: model,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNewsTemplateByIdQuery,
  useGetAllNewsTemplateQuery,
  useLazyGetNewsTemplateByIdQuery,

  usePutNewsTemplateByIdMutation,
} = extendedApi;

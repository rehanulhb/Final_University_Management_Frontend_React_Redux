import type { TSemester } from '../../../types/courseManagement.type';
import type { TQueryParam, TResponseRedux } from '../../../types/global';
import { baseApi } from '../../api/baseApi';

const courseManagmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/semester-registration',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: '/semester-registration/create-semester-registration',
        method: 'POST',
        body: data,
      }),
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registration/${args.id}`,
        method: 'POST',
        body: args.data,
      }),
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} = courseManagmentApi;

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import layerReducer from "../slices/layerSlice";
import newsTemplateReducer from "../slices/newsTemplateSlice";
import { designPlatformApi } from "../services/api";
import { tier1Api } from "../services/api/tier1";

export const store = configureStore({
  reducer: {
    user: userReducer,
    layer: layerReducer,
    newsTemplate: newsTemplateReducer,
    [designPlatformApi.reducerPath]: designPlatformApi.reducer,
    [tier1Api.reducerPath]: tier1Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(designPlatformApi.middleware)
      .concat(tier1Api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// export const persistor = persistStore(store);

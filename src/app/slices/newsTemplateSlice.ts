import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsTemplateType } from "../types/NewsTemplateTypes";

type NewsTemplateState = {
  template: NewsTemplateType | undefined;
  isLoading: boolean;
};

const initialState: NewsTemplateState = {
  template: undefined,
  isLoading: false,
};

export const newsTemplateSlice = createSlice({
  name: "newsTemplate",
  initialState,
  reducers: {
    setNewsTemplate: (state, action: PayloadAction<NewsTemplateType>) => {
      state.template = action.payload;
    },
    setIsLoadingTemplate: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setNewsTemplate, setIsLoadingTemplate } = newsTemplateSlice.actions;

export default newsTemplateSlice.reducer;

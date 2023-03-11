export type TEtsyPingResponseDto = {
  application_id: number;
};

export type TEtsyAuthResponseDto = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
};

export type TRedirectParametersSuccessDto = {
  state: string;
  code: string;
};

export type TRedirectParametersErrorDto = {
  state: string;
  error: string;
  error_description: string;
  error_uri: string;
};

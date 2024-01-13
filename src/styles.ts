/*
 * Copyright (C) 2024. Lazar Dobrota and Nemanja Radovanovic
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createTheme, SxProps, Theme } from "@mui/material";
import { orange } from "@mui/material/colors";
import { userAdminHeadWidth } from "./types/table";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: orange[500]
    }
  },
  typography: {
    h4: {
      color: "#F0F1F2"
    }
  }
});

export const mainContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1 0 0',
  alignSelf: 'stretch',
  width: '100%',
  height: '100%',
}

export const formStyles: SxProps<Theme> = {
  display: 'flex',
  padding: '80px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  backgroundColor: '#121212',
  borderRadius: '10px'
}

export const componentsVerticalStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}

export const componentsHorizontalStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px'
}

export const componentFixedWideStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '330px'
}

export const componentFixedNormalStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '220px'
}

export const componentFilStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}

export const userAdminCellStyles = (index: number) => {
  return {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: `${userAdminHeadWidth[index]}px`
  }
}

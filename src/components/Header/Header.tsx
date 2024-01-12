``/*
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

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { headerRole, headerTab } from "../../types/header.ts";
import LogoExtended from "../Icons/LogoExtended.tsx";
import { RoleType } from "../../types/user.ts";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER_KEY, removeLocalStorageDataAsync } from "../../types/localstorage.ts";

type HeaderProps = {
  role: RoleType,
  name?: string;
}

function Header({ role, name }: HeaderProps) {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileMenuItem = () => navigate("/profile");

  const handleLogoutMenuItem = async () => await removeLocalStorageDataAsync(CURRENT_USER_KEY).then(() => {
    navigate("/");
    navigate(0);
  });

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{display: 'flex', flexGrow: 1, '&:hover': {cursor: 'pointer'}}}>
            <LogoExtended onClick={() => navigate('/')}/>
          </Box>

          <Box>
            {headerRole[role.name].map((tabKey: string) => (
              <Button {...headerTab[tabKey]}>
                {headerTab[tabKey].name}
              </Button>
            ))}
          </Box>

          {role.name !== 'Unauthorized' &&
            <Box sx={{marginLeft: '10px'}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt={name} src="/"/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                disableScrollLock={true}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key='profile' sx={{width: '130px'}} onClick={handleProfileMenuItem}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key='logout' sx={{width: '130px'}} onClick={handleLogoutMenuItem}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;


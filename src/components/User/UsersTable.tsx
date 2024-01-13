import { Box, CircularProgress, Pagination, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import dayjs from "dayjs";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { formStyles, userAdminCellStyles } from "../../styles";
import { OrderType, Pageable } from "../../types/common";
import { CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage";
import { UserAdminHeadType, userAdminHeadType, userAdminHeadWidth, userAdminParamName } from "../../types/table";
import { User } from "../../types/user";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>();
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  const [orderType, setOrderType] = useState<OrderType>('none');
  const [orderBy,   setOrderBy]   = useState<UserAdminHeadType>();
  const navigate = useNavigate();
  const handleSortEvent = (newOrderBy: UserAdminHeadType) => () => {
    if (orderBy !== newOrderBy) {
      setOrderType('asc');
      setOrderBy(newOrderBy);
    }
    else if (orderType === 'none')
        setOrderType('asc');
    else if (orderType === 'asc')
        setOrderType('desc');
    else if (orderType === 'desc')
      setOrderType('none');
  }

  const handleNewPage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  }

  useEffect(() => {
    (async () => {
      const userToken = getLocalStorageData(CURRENT_USER_KEY, null);
      if (userToken == null) return;

      const data = await fetch(`http://localhost:8000/api/user/all?page=${currentPage - 1}&size=${pageSize}${(orderType !== 'none') ? orderBy ? `&sort=${userAdminParamName[orderBy]},${orderType}`: '': ''}`, { 
      method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": userToken.token
        },
      }).then(response => response.json())
        .catch(error => console.log(error)) as Pageable<User>;

      setTotalPages(data.totalPages);
      setUsers(data.content);
    })();
  }, [currentPage, orderType]);

  if (users == undefined) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const handleClick = (_event: MouseEvent<unknown>, username: string) => {
    navigate(`/user/${username}`);
  };

  return (
    <Box sx={formStyles}>
      <Typography variant="h4">Users</Typography>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            {userAdminHeadType.map((item, index) => (
              <TableCell key={item} width={userAdminHeadWidth[index]} sx={{ borderTop: '1px solid #515151'}}>
                <TableSortLabel
                  active={item === orderBy && orderType !== 'none'}
                  direction={item === orderBy ? orderType === 'none' ? 'asc' : orderType : 'asc'}
                  onClick={handleSortEvent(item)}
                >
                  {item}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, index) =>
            <TableRow key={index}>
              <TableCell align="left" sx={{...userAdminCellStyles(0)}} onClick={(event) => handleClick(event, item.username)}>{item.firstname}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(1)}} onClick={(event) => handleClick(event, item.username)}>{item.lastname}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(2)}} onClick={(event) => handleClick(event, item.username)}>{item.username}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(3)}} onClick={(event) => handleClick(event, item.username)}>{item.userRole.name}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(4)}} onClick={(event) => handleClick(event, item.username)}>{item.email}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(5)}} onClick={(event) => handleClick(event, item.username)}>{item.password}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(6)}} onClick={(event) => handleClick(event, item.username)}>{item.dateOfBirth}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(7)}} onClick={(event) => handleClick(event, item.username)}>{`${item.recruitmentDate ? dayjs(item.recruitmentDate) : ""}`}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(8)}} onClick={(event) => handleClick(event, item.username)}>{item.membershipId}</TableCell>
              <TableCell align="left" sx={{...userAdminCellStyles(9)}} onClick={(event) => handleClick(event, item.username)}>{item.gym?.name}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination count={totalPages} onChange={handleNewPage} size='medium' />
    </Box>
  )
}

export default UsersTable;

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


import Box from "@mui/material/Box";
import { formStyles } from "../../styles.ts";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import { CircularProgress, Pagination } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { ChangeEvent, useEffect, useState } from "react";
import { UserTrainingAppointment } from "../../types/user.ts";
import { CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage.ts";
import { OrderType, Pageable } from "../../types/common.ts";
import {
  trainingAdminHeadType,
  TrainingAdminHeadType,
  trainingAdminHeadWidth,
  trainingAdminParamName
} from "../../types/table.ts";

const TrainingsAdminView = () => {
  const [appointments, setAppointments] = useState<UserTrainingAppointment[]>();
  const [totalPages, setTotalPages]     = useState<number>();
  const [currentPage, setCurrentPage]   = useState<number>(1)
  const pageSize = 8;

  const [orderType, setOrderType] = useState<OrderType>('none');
  const [orderBy,   setOrderBy]   = useState<TrainingAdminHeadType>();

  const handleSortEvent = (newOrderBy: TrainingAdminHeadType) => () => {
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

      const data = await fetch(`http://localhost:8000/api/schedule/client-training-appointment?page=${currentPage - 1}&size=${pageSize}${(orderType !== 'none') ? orderBy ? `&sort=${trainingAdminParamName[orderBy]},${orderType}`: '': ''}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": userToken.token
        },
      }).then(response => response.json())
        .catch(error => console.log(error)) as Pageable<UserTrainingAppointment>;

      setTotalPages(data.totalPages);
      setAppointments(data.content);
    })();
  }, [currentPage, orderType]);

  if (appointments == undefined) {
    return (
      <Box sx={{ display: 'flex'}}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={formStyles}>
      <Typography variant="h4">Trainings</Typography>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            {trainingAdminHeadType.map((item, index) => (
              <TableCell key={item} width={trainingAdminHeadWidth[index]} sx={{borderTop:'1px solid #515151'}}>
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
          {appointments.map((item, index) =>
            <TableRow
              key={index}
              hover={true}
              sx={{'&:hover': { cursor: 'pointer'}}}
            >
              <TableCell align="left">{item.trainingAppointment.gym.name}</TableCell>
              <TableCell align="left">{item.trainingAppointment.training.name}</TableCell>
              <TableCell align="left">{item.trainingAppointment.status.name}</TableCell>
              <TableCell align="left">{item.trainingAppointment.date.toString()}</TableCell>
              <TableCell align="left">{item.trainingAppointment.time.toString()}</TableCell>
              <TableCell align="left">{item.client.username}</TableCell>
              <TableCell align="left">{item.status.name}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination count={totalPages} onChange={handleNewPage} size='medium' />
    </Box>
  )
}

export default TrainingsAdminView;

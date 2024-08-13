"use client";

import type React from "react";
import type { ReactNode } from "react";

import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { Paper, Stack, Divider, Pagination, Typography } from "@mui/material";

type PropType = {
	totalCount?: number;
	page?: number;
	title?: React.ReactNode;
	columns: {
		title: string | ((item: any) => ReactNode);
		modify: (item: any) => ReactNode;
	}[];
	data: any[];
	width?: any;
	minWidthCell?: any;
	action?: ReactNode;
	onTableClick?: (id: string) => void;
	handleChangePage?: (
		_event: React.ChangeEvent<unknown>,
		newPage: number,
	) => void;
	hasTitle?: boolean;
};

const CustomTable = ({
	page = 1,
	handleChangePage,
	title,
	columns,
	data,
	width,
	minWidthCell,
	action,
	onTableClick,
	totalCount = 10,
	hasTitle = true,
}: PropType) => (
	<Stack
		sx={{
			borderRadius: hasTitle ? 2 : 0,
			border: "1.5px solid",
			borderColor: "dark.3",
			bgcolor: "dark.2",
			width: width ?? "100%",
			overflow: "hidden",
		}}
	>
		{hasTitle && (
			<Stack
				direction="row"
				width="100%"
				justifyContent="space-between"
				p={3}
				pb={2}
			>
				<Stack direction="row" spacing={1}>
					<Typography variant="body1">{title}</Typography>
				</Stack>

				{action && action}
			</Stack>
		)}
		<TableContainer
			component={Paper}
			sx={{
				bgcolor: "dark.2",
				borderRadius: 0,
				".MuiTableCell-head": {
					borderBottom: "none",
					bgcolor: "dark.3",
					typography: "caption-medium",
					textTransform: "uppercase",
					color: "grey.light",
					p: 0,
					py: 1,
					"&:first-of-type": { pl: 3 },
					"&:last-of-type": { pr: 3 },
					"&:not(:last-of-type)": { pr: "14px" },
				},
				".MuiTableCell-root:not(.MuiTableCell-head)": {
					minWidth: minWidthCell ?? 150,
					typography: "p2-medium",
					color: "white",
					textAlign: "start",
					p: 0,
					py: 2,
					borderBottomStyle: "solid",
					borderColor: "dark.3",
					borderWidth: "1.5px",
					"&:first-of-type": { pl: 3 },
					"&:last-of-type": { pr: 3 },
					"&:not(:last-of-type)": { pr: "14px" },
				},
				".MuiTableRow-head": { height: 40 },
				".MuiTableRow-root:not(.MuiTableRow-head)": { height: 56 },
			}}
		>
			<Table aria-label="customized table" sx={{ px: "0 !important" }}>
				<TableHead>
					<TableRow>
						{columns.map((head, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<TableCell align="left" key={index}>
								{typeof head.title === "string" ? head.title : head.title(data)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((rowItem) => (
						<TableRow
							key={rowItem.id}
							onClick={() => onTableClick?.(rowItem.walletAddress)}
							sx={{
								cursor: onTableClick ? "pointer" : "default",
								px: "30px !important",
							}}
						>
							{columns.map((item, index) => (
								<TableCell align="left" key={index}>
									{item.modify(rowItem)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>

		{totalCount > 10 && (
			<>
				<Divider flexItem orientation="horizontal" />
				<Stack direction="row" justifyContent="center" py={1.5}>
					<Pagination
						count={Math.ceil(totalCount / 10)}
						defaultPage={1}
						page={page}
						onChange={handleChangePage}
						siblingCount={0}
						boundaryCount={2}
					/>
				</Stack>
			</>
		)}
	</Stack>
);

export default CustomTable;

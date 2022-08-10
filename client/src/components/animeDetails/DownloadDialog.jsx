import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

/**
 * Dialog to ask a user if it is ok to download a song into their computer
 * @param {*} param0
 * @returns
 */
const DownloadDialog = ({ link, setOpen }) => {
	/**
	 * closes modal
	 */
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={true} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{"Download Song"}</DialogTitle>
			<DialogContent>
				{link ? (
					<DialogContentText id="alert-dialog-description">
						Do you allow this third party application to download a song onto your computer!?
					</DialogContentText>
				) : (
					<DialogContentText id="alert-dialog-description">There is no video link for this opening/ending!?</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				{link ? <Button onClick={handleClose}>Disagree</Button> : <Button onClick={handleClose}>Close</Button>}
				{link && (
					<a href={link}>
						<Button onClick={handleClose} autoFocus>
							Agree
						</Button>
					</a>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default DownloadDialog;

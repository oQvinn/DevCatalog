import React from "react";
import Modal from 'react-modal';
import { useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import FlexBetween from './FlexBetween';
import {useSelector, useDispatch } from 'react-redux';
import { setModal } from 'state';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const UploadModal = ({mstate}) => {
    const [modalIsOpen, setIsOpen] = useState(mstate);
    const dispatch = useDispatch();

    function closeModal(){
        setIsOpen(false);
        dispatch(setModal());
    }

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [file, setFile] = useState(null);
    const [buttonActive, setButtonActive] = useState(false);

    const onFormSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("resumePath", file[0].name);
        formData.append("resume", file[0]);

        await fetch(`http://localhost:3001/users/${user._id}`, {
            method: "PUT",
            headers: {Authorization: `Bearer ${token}`},
            body: formData
        }).then((res) => {
            if(res){
                alert("File uploaded successfully!");
            }
        }).catch((err) => {
            alert("Something went wrong, please try again...");
        });

        setIsOpen(false);
        dispatch(setModal());
        refreshPage();
    };

    const onChange = (e) => {
        setFile(e.target.files);
        setButtonActive(true);
    };

    function refreshPage(){
        window.location.reload(false);
    };

    return(
        <div>
            <Box>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Upload Modal"
                >
                    <Typography>Please select a resume that you would like to upload</Typography>
                    <form onSubmit={(e) => onFormSubmit(e)}>
                        <input type="file" className="resume" name="resume" onChange={(e) => onChange(e)}></input>
                        <button type="submit" disabled={!buttonActive}>Submit</button>
                    </form>
                    <FlexBetween>
                        <button onClick={closeModal}>Cancel</button>
                    </FlexBetween>
                </Modal>
            </Box>
        </div>
    )
}
export default UploadModal;
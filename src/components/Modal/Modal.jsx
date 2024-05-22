import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import ImageCropper from "../ImageCropper/ImageCropper";

const Modal = ({ updateAvatar, closeModal, contenido }) => {
  return (
    <Dialog
      open={true} // Ajusta el estado de apertura según sea necesario
      onClose={closeModal}
      aria-labelledby="crop-image-dialog"
      aria-describedby="crop-image-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <IconButton
                onClick={closeModal}
                variant="outlined"
                color="inherit"
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
              {/* <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              /> */}
              {contenido}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;

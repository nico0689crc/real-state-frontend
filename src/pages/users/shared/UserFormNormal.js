import { Stack } from "@mui/material";

const UserFormNormal = ({headerContent, bodyContent, footerContent}) => {
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        {headerContent}
        {bodyContent}
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2}>
        {footerContent}
      </Stack>
    </Stack>
  )
};

export default UserFormNormal;

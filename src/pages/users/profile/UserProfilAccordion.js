import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { ExpandMore } from '@mui/icons-material';
import UserProfileInformationForm from "./UserProfileInformationForm";
import UserProfileChangePasswordForm from "./UserProfileChangePasswordForm";

const UserProfileAccordion = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const handleChange = (panel, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === 'user_information'} onChange={(event, isExpanded) => handleChange('user_information', isExpanded)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{t("users.profile.sections.user_information")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserProfileInformationForm />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'change_password'} onChange={(event, isExpanded) => handleChange('change_password', isExpanded)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{t("users.profile.sections.change_password")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserProfileChangePasswordForm />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default UserProfileAccordion;
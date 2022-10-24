import {useState, useRef, useEffect} from "react";
import {ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, ButtonGroup, Button} from '@mui/material';
import { GTranslate, ArrowDropDown } from '@mui/icons-material';
import i18next from 'i18next';

const TranslationButton = () => {
  const languages = [{
    key: "en",
    label: "English"
  },{
    key: "es",
    label: "Español"
  }];

  const { language, changeLanguage } = i18next;
  const [open, setOpen] =useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(()=>{
    const index = languages.findIndex(lang => language === lang.key);
    setSelectedIndex(index > -1 ? index : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleMenuItemClick = (event, index) => {
    changeLanguage(languages[index].key);
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button startIcon={<GTranslate/>}>{languages[selectedIndex].key}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label=""
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {languages.map((option, index) => (
                    <MenuItem key={index} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)} >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default TranslationButton;
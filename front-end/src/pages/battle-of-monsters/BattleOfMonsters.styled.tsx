import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { colors } from "../../constants/colors"

export const PageContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  maxWidth: '820px',
  margin: '0 auto'
}))
  
export const BattleSection = styled.section(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '25px'
}))
  
export const WinnerSection = styled.section(() => ({
  display: 'flex',
  padding: '14px',
  alignItems: 'center',
  backgroundColor: colors.lightBlue,
  boxShadow: '-2px 3px 10px 0px rgba(0, 0, 0, 0.25)',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  borderRadius: '4px',
  border: 'solid 1px #000000'

}))
  
  
  
export const StartBattleButton = styled(Button)(({ disabled }) => ({
  background: disabled ? colors.lightGreen : colors.darkGreen,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '5px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '21px',
  color: `${colors.white} !important`,
  padding: '12px 30px',
  textTransform: 'capitalize',
  '&:hover': {
    background: colors.darkGreenHover
  }
}))

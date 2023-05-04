import { styled } from '@mui/system'
import { Card } from '@mui/material';

const StyleCard = styled(Card)((({ theme }) => ({
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: 50,
        height: 50,
    },
    [theme.breakpoints.up('md')]: {
        width: 60,
        height: 60,
    },
})))

export default StyleCard
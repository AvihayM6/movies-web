import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import '../../style/navigateBar.css'

export const NavigateBar = ({setOption}) => {
  return (
    <div className="navigate-bar-container">
      <h3 className='display-movies-title'>
        <div className='title'>Popular Movies</div>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={() => setOption('popular')}
                  sx={{fontWeight: '600', color:'#092543'}}>
            Popular
          </Button>
          <Button onClick={() => setOption('stream-now')}
                  sx={{fontWeight: '600', color:'#092543'}}>
            Stream Now
          </Button>
          <Button onClick={() => setOption('my-favorites')}
                  sx={{fontWeight: '600', color:'#092543'}}>
            My Favorites
          </Button>
        </ButtonGroup>
      </h3>
    </div>
  )
}
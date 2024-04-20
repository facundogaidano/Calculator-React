const Footer = () => {
  const name = 'Facundo Gaidano'
  const currDate = new Date()
  const year = currDate.getFullYear()
  return (
    <>
      Created by {name}<br/>
      Copyright {year}
    </>
  )
}

export default Footer
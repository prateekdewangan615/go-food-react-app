import MenuList from "./MenuList"

// function component with anonymous function
const Footer = function () {
  const copyrightYear = 2024;
  return (
    <footer className="text-center">
      <hr />
      <p>Copyright {copyrightYear}</p>
      <MenuList/>
    </footer>
  )
}
export default Footer
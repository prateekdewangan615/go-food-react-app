import MenuList from "./MenuList"

// function component with anonymous function
const Footer = function () {
  const copyrightYear = 2024;
  return (
    <footer className="text-center">
      <hr />
      <MenuList/>
      <p>Copyright&copy; {copyrightYear}</p>
    </footer>
  )
}
export default Footer
import Link from "next/link"
import Menu from "./Menu"

const Header = () => {
  return (
    <div>
      <nav>
        <div className="navbar justify-between bg-base-300">
            <Link href="/" className="btn btn-ghost text-lg">
                Nextjs-Ecommerce
            </Link>
            <Menu/> 
        </div>
      </nav>
    </div>
  )
}

export default Header
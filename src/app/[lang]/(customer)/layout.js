import PiUser from "./pi";

export default function PiLayout({children}){
    return (
        <PiUser>
            {children}
        </PiUser>
    )
}
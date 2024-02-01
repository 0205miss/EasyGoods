import PiUser from "./pi";

export default function BusinessLayout({children}){
    return (
        <PiUser>
            {children}
        </PiUser>
    )

}
import Nav from './Nav'

import NextNProgress from 'nextjs-progressbar'
import { ThemeProvider } from 'next-themes'

function Layout ({children}){
  return(
    <ThemeProvider attribute="class">
      <div className="font-nunito bg-lmrs-back min-h-screen dark:bg-dmrs-back">
        <NextNProgress color="#858585"/>
        <Nav />
        {children}
      </div>
    </ThemeProvider>
  )
}
export default Layout
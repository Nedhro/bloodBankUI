import { FC } from "react";


interface FooterProps{
    translate: (key: string) => string
}
const Footer: FC<FooterProps> = ({translate})=>{

    return(
        <div className="container-fliud text-center footer pt-2 mb-0 pb-0">
          <p>
            &copy; {new Date().getFullYear()} {translate('copyright')}
            <a className="text-center navText" href="https://ctechbd.com/">
                {translate('ctech')}
            </a>
          </p>
        </div>
    );
}

export default Footer;
import { createContext, useContext, useState, type ReactNode } from "react";

type ModalType = ""|"schedule" | "task"|"feedback";
type ModalData = | {mode: "create",date?:Date,onSuccess?:() => void;}
                 | {mode:"edit";
                    kind:"normal";
                    event:{
                        id:string,
                        title:string,
                        date:Date,
                        start:Date | null,
                        end:Date | null,
                        allDay:boolean,
                        scheduleMemo?:string;
                    };
                    onSuccess?:()=>void;
                 }
                 |{
                    mode:"edit";
                    kind:"period";
                    event:{
                        id:string,
                        title:string,
                        start:Date,
                        end:Date,
                        scheduleMemo:string;
                    };
                    onSuccess?:()=>void;
                 }

interface ModalContextProps {
    isOpen:boolean;
    modalType:ModalType;
    modalData:ModalData | null;
    openModal:(type: ModalType,data?:any)=> void;
    closeModal:()=> void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({children}:{children:ReactNode}) =>{
    const [isOpen,setIsOpen] = useState(false);
    const [modalType,setModalType] = useState<ModalType>("");
    const [modalData,setModalData] = useState<ModalData|null>(null);
    const openModal = (type:ModalType,data?:ModalData) =>{
        setModalType(type);
        setModalData(data ?? null);
        setIsOpen(true);
    };
    const closeModal =() => {
        setIsOpen(false);
        setModalType("");
        setModalData(null);
    }
    return(
        <ModalContext.Provider value={{isOpen,modalType,modalData,openModal,closeModal}}>
            {children}
        </ModalContext.Provider>
    );
};
export const useModal = () =>{
    const context = useContext(ModalContext);
    if(!context){
        throw new Error("useModal must be used within ModalProvider");
    }
    return context;
}
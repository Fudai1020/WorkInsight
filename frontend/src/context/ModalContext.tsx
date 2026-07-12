import { createContext, useContext, useState, type ReactNode } from "react";

type ModalType = ""|"schedule" | "task"|"feedback";
type ModayData = | {mode: "create",date?:Date,onSuccess?:() => void;}
                 | {mode:"edit";
                    event:{
                        id:string,
                        title:string,
                        date:Date,
                        start:Date | null,
                        end:Date | null,
                        allDay:boolean,
                        ScheduleMemo?:string;
                    };
                    onSuccess?:()=>void;
                 };

interface ModalContextProps {
    isOpen:boolean;
    modalType:ModalType;
    modalData:any;
    openModal:(type: ModalType,data?:ModayData)=> void;
    closeModal:()=> void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({children}:{children:ReactNode}) =>{
    const [isOpen,setIsOpen] = useState(false);
    const [modalType,setModalType] = useState<ModalType>("");
    const [modalData,setModalData] = useState<ModayData|null>(null);
    const openModal = (type:ModalType,data?:any) =>{
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
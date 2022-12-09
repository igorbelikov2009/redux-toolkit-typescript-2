import React, { FC } from "react";
import cl from "./MyModal.module.css";

interface MyModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyModal: FC<MyModalProps> = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.myModal];
  // С помощью этой конструкции мы определяем, добавлять класс (cl.active) или нет.
  if (visible) {
    // rootClasses = myModal.active
    rootClasses.push(cl.active);
  }

  return (
    // join(" ") возвращает строку, и в этой строке будет 2 класса, склеенных по пробелу
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;

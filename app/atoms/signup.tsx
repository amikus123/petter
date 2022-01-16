import { atom, selector } from "recoil";
import { genders, species } from "../const/general";

export interface HumanForm{
  name: string;
  bio: string;
  image: string | null;
  gender: string;
}
export interface PetForm{
  name: string;
  bio: string;
  image: string | null;
  gender: string;
  species:string;
}


export const humanSigninFormAtom = atom({
  key: "humanSigninFormAtom",
  default: {
    name: "",
    bio: "",
    image: null,
    gender: genders[0],
  } as HumanForm,
})

export const petSigninFormAtom = atom({
  key: "petSigninFormAtom",
  default: {
    name: "",
    bio: "",
    image: null,
    gender: genders[0],
    species:species[0]
  } as PetForm,
})



const checkIfObjIsReady = (
  obj: HumanForm | PetForm,
) => {
  let isReady = true;
  Object.entries(obj).map((item) => {
    const [key, value] = item;
    if (value === "" || value === null) {
      isReady = false;
    }
  });
  return isReady;
};
export const signFormSelector = selector({
  key: "signFormSelector",
  get: ({ get }) => {
    const humanValues= get(humanSigninFormAtom);
    const petValues = get(petSigninFormAtom);

    const isHumanReady = checkIfObjIsReady(humanValues);
    const isPetReady = checkIfObjIsReady(petValues);
    return { isHumanReady, isPetReady };
  },
});

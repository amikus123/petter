import { atom, selector } from "recoil";
import { genders, species } from "../const/general";

export interface SignInInterface {
  humanName: string;
  petName: string;
  petBio: string;
  humanBio: string;
  petSpecies: string;
  petImageId: string | null;
  humanImageId: string | null;
  petGender: string;
  humanGender: string;
}

export interface HumanForm{
  name: string;
  bio: string;
  imageId: string | null;
  gender: string;
}
export interface PetForm{
  name: string;
  bio: string;
  imageId: string | null;
  gender: string;
  species:string;
}


export const humanSigninFormAtom = atom({
  key: "humanSigninFormAtom",
  default: {
    name: "",
    bio: "",
    imageId: null,
    gender: genders[0],
  } as HumanForm,
})

export const petSigninFormAtom = atom({
  key: "petSigninFormAtom",
  default: {
    name: "",
    bio: "",
    imageId: null,
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

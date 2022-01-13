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

export const signFormAtom = atom({
  key: "signForm",
  default: {
    humanName: "",
    petName: "",
    petBio: "",
    humanBio: "",
    petSpecies: species[0],
    petImageId: null,
    humanImageId: null,
    petGender: genders[0],
    humanGender: genders[0],
  } as SignInInterface,
});

const checkIfObjIsReady = (
  obj: SignInInterface,
  prefix: "pet" | "human" | "" = ""
) => {
  let isReady = true;
  console.log("fire");
  Object.entries(obj).map((item) => {
    const [key, value] = item;

    if (key.indexOf(prefix) === 0 && (value === "" || value === null)) {
      isReady = false;
    }
  });
  return isReady;
};
export const signFormSelector = selector({
  key: "signFormSelector",
  get: ({ get }) => {
    const values = get(signFormAtom);
    const isHumanReady = checkIfObjIsReady(values, "human");
    const isPetReady = checkIfObjIsReady(values, "pet");
    return { isHumanReady, isPetReady };
  },
});

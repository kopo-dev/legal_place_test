import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("should keep the benefit above 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)]
    );
  });

  it("should degrade benefit twice as fast is expiresIn is passed", () => {
    expect(new Pharmacy([new Drug("test", 0, 2)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 0)]
    );
  });

  describe("Herbal Tea", () => {
    it("should increase the benefit as expiresIn decrease", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", 1, 4)]);
    });

    it("should increase the benefit twice as fast if expiresIn is 0 or lower", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 2)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -1, 4)]);
    });

    it("should keep the benefit at a maximum of 50", () => {
      expect(
        new Pharmacy([
          new Drug("Herbal Tea", 1, 50),
          new Drug("Herbal Tea", 0, 49),
        ]).updateBenefitValue()
      ).toEqual([
        new Drug("Herbal Tea", 0, 50),
        new Drug("Herbal Tea", -1, 50),
      ]);
    });
  });

  describe("Magic Pill", () => {
    it("should not decrease nor increase benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 25, 25)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 25, 25)]);
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 if expiresIn above 10", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 25, 25)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 24, 26)]);
    });

    it("should set benefit to 0 if expiresIn is 0 or lower", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 25)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });

    it("should increase benefit by 3 if expiresIn is between ]0, 5]", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 25)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 4, 28)]);
    });

    it("should increase benefit by 2 if expiresIn is between ]5, 10]", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 25)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 9, 27)]);
    });
  });

  describe("Dafalgan", () => {
    it("should decrease in benefit by 2", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 25, 25)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", 24, 23)]);
    });

    it("should decrease in benefit by 4 if expiresIn is 0 or lower", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 0, 10)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", -1, 6)]);
    });

    it("should not have benefit under 0", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 25, 1)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", 24, 0)]);
    });
  });
});

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  decreaseExpiresIn() {
    this.expiresIn -= 1;
  }

  clampBenefit() {
    if (this.benefit < 0) {
      this.benefit = 0;
    }
    if (this.benefit > 50) {
      this.benefit = 50;
    }
  }

  updateBenefit() {
    if (this.expiresIn <= 0) {
      this.benefit -= 2;
    } else {
      this.benefit -= 1;
    }
  }

  update() {
    this.updateBenefit();
    this.clampBenefit();
    this.decreaseExpiresIn();
  }
}

export class Dafalgan extends Drug {
  updateBenefit() {
    if (this.expiresIn <= 0) {
      this.benefit -= 4;
    } else {
      this.benefit -= 2;
    }
  }
}

export class Fervex extends Drug {
  updateBenefit() {
    if (this.expiresIn <= 0) {
      this.benefit = 0;
    } else if (this.expiresIn <= 5) {
      this.benefit += 3;
    } else if (this.expiresIn <= 10) {
      this.benefit += 2;
    } else {
      this.benefit += 1;
    }
  }
}

export class MagicPill extends Drug {
  update() {}
}

export class HerbalTea extends Drug {
  updateBenefit() {
    if (this.expiresIn <= 0) {
      this.benefit += 2;
    } else {
      this.benefit += 1;
    }
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs.map(this.mapDrug);
  }

  mapDrug(drug) {
    switch (drug.name) {
      case "Dafalgan":
        return new Dafalgan(drug.name, drug.expiresIn, drug.benefit);
      case "Fervex":
        return new Fervex(drug.name, drug.expiresIn, drug.benefit);
      case "Magic Pill":
        return new MagicPill(drug.name, drug.expiresIn, drug.benefit);
      case "Herbal Tea":
        return new HerbalTea(drug.name, drug.expiresIn, drug.benefit);
      default:
        return drug;
    }
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      drug.update();
    }

    return this.drugs;
  }
}

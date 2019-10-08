package com.cpe.springboot.card.model;

public class CardLightModel extends CardReference {

    private float energy;
    private float hp;
    private float defence;
    private float attack;
    private float price;

    private Integer userId;
    private Integer storeId;

    public CardLightModel() {

    }

    public CardLightModel(CardModel cModel) {
        super(cModel);
        this.energy=cModel.getEnergy();
        this.hp=cModel.getHp();
        this.defence=cModel.getDefence();
        this.attack=cModel.getAttack();
        this.price=cModel.getPrice();
        if( cModel.getUser() != null) {
            this.userId = cModel.getUser().getId();
        }
        if( cModel.getStore()!=null) {
            this.storeId = cModel.getStore().getId();
        }

    }

    public float getEnergy() {
        return energy;
    }

    public void setEnergy(float energy) {
        this.energy = energy;
    }

    public float getHp() {
        return hp;
    }

    public void setHp(float hp) {
        this.hp = hp;
    }

    public float getDefence() {
        return defence;
    }

    public void setDefence(float defence) {
        this.defence = defence;
    }

    public float getAttack() {
        return attack;
    }

    public void setAttack(float attack) {
        this.attack = attack;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }
}

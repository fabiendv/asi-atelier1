package com.cpe.springboot.card.model;

import com.cpe.springboot.store.model.StoreModel;
import com.cpe.springboot.user.model.UserModel;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class CardModel extends CardReference{
	private float energy;
	private float hp;
	private float defence;
	private float attack;
	private float price;

	//@ManyToOne(fetch = FetchType.LAZY)
	//@ManyToOne(cascade = CascadeType.ALL)
	//@JoinColumn(name = "user_id", nullable = true)
	@ManyToOne
	@JoinColumn
	private UserModel user;

	@ManyToOne
	@JoinColumn
	private StoreModel store;

	public CardModel() {
		super();
	}

	public CardModel(CardReference cardRef) {
		super(cardRef);
	}

	public CardModel(String name, String description, String family, String affinity, float energy, float hp,
					 float defence, float attack,String imgUrl,String smallImg,float price) {
		super(name, description, family, affinity,imgUrl,smallImg);
		this.energy = energy;
		this.hp = hp;
		this.defence = defence;
		this.attack = attack;
		this.price=price;
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

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}

	public void setStore(StoreModel storeModel) {
		this.store=storeModel;
	}

	public StoreModel getStore() {
		return store;
	}

	public float computePrice() {
		return this.hp * 20 + this.defence*20 + this.energy*20 + this.attack*20;
	}


}

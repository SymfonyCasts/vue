<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;

class CartItem
{
    /**
     * @Groups({"cart:write", "cart:read"})
     */
    private $product;

    /**
     * @Groups({"cart:write", "cart:read"})
     */
    private $color;

    /**
     * @Groups({"cart:write", "cart:read"})
     */
    private $quantity;

    /**
     * @param $product
     * @param $color
     */
    public function __construct(Product $product, Color $color = null)
    {
        $this->product = $product;
        $this->color = $color;
    }


    public function getProduct(): Product
    {
        return $this->product;
    }

    public function getColor(): ?Color
    {
        return $this->color;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity)
    {
        $this->quantity = $quantity;
    }

    public function matches(CartItem $cartItem)
    {
        $thisKey = sprintf('%s_%s', $this->getProduct()->getId(), $this->getColor() ? $this->getColor()->getId() : 'no_color');
        $thatKey = sprintf('%s_%s', $cartItem->getProduct()->getId(), $cartItem->getColor() ? $cartItem->getColor()->getId() : 'no_color');

        return $thisKey === $thatKey;
    }
}

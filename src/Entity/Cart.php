<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"="cart:read"},
 *     denormalizationContext={"groups"="cart:write"},
 *     collectionOperations={"post"},
 *     itemOperations={
 *          "get"={
 *          },
 *          "put"={
 *          },
 *          "delete"={
 *          },
 *     }
 * )
 */
class Cart
{
    /**
     * @ApiProperty(identifier=true)
     */
    private $id;

    /**
     * @var CartItem[]
     * @Groups({"cart:read", "cart:write"})
     */
    private $items = [];

    public function __construct()
    {
        $this->id = (Uuid::uuid4())->toString();
    }

    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return CartItem[]|array
     */
    public function getItems(): array
    {
        return $this->items;
    }

    public function addItem(CartItem $cartItem)
    {
        foreach ($this->items as $key => $item) {
            if ($cartItem->matches($item)) {
                $this->items[$key] = $cartItem;

                return;
            }
        }

        $this->items[] = $cartItem;
    }

    public function removeItem(CartItem $cartItem)
    {
        foreach ($this->items as $key => $item) {
            if ($cartItem->matches($item)) {
                unset($this->items[$key]);
                $this->items = array_values($this->items);

                return;
            }
        }
    }
}

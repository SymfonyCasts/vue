<?php

namespace App\ApiPlatform;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Cart;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class CartDataPersister implements DataPersisterInterface
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function supports($data): bool
    {
        return $data instanceof Cart;
    }

    /**
     * @param Cart $cart
     */
    public function persist($cart)
    {
        $this->session->set(self::getKey($cart->getId()), $cart);
        $this->session->set('_cart_id', $cart->getId());
    }

    /**
     * @param Cart $cart
     */
    public function remove($cart)
    {
        $this->session->remove(self::getKey($cart->getId()));
        $this->session->remove('_cart_id');
    }

    public static function getKey(string $uuid)
    {
        return sprintf('_cart_%s', $uuid);
    }
}

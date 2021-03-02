<?php

namespace App\ApiPlatform;

use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\Cart;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CartDataProvider implements ItemDataProviderInterface, RestrictedDataProviderInterface
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === Cart::class;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        $key = CartDataPersister::getKey($id);
        if (!$this->session->has($key)) {
            throw new NotFoundHttpException('Cart not found');
        }

        return clone $this->session->get($key);
    }
}

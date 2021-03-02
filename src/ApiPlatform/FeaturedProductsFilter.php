<?php

namespace App\ApiPlatform;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;

class FeaturedProductsFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        if ($property !== 'featured') {
            return;
        }

        $alias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->leftJoin(sprintf('%s.colors', $alias), 'color')
            ->andWhere('color.id IS NOT NULL');
    }

    public function getDescription(string $resourceClass): array
    {
        return [
            'featured' => [
                'property' => null,
                'type' => 'bool',
                'required' => false,
                'openapi' => [
                    'description' => 'Returns "featured" products',
                    'schema' => [
                        'type' => 'bool',
                    ],
                ],
            ]
        ];
    }
}

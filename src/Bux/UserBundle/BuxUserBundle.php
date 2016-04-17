<?php

namespace Bux\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * Class BuxUserBundle
 *
 * @package Bux\UserBundle
 */
class BuxUserBundle extends Bundle
{
    /**
     * @return string
     */
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
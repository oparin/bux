<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 3:31 PM
 */

namespace Bux\Admin\MembersBundle\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;

/**
 * Class WalletColumn
 *
 * @package Bux\Admin\MembersBundle\Grid\Column
 */
class WalletColumn extends Column
{
    /**
     * @param array $params
     */
    public function __initialize(array $params)
    {
        parent::__initialize($params);

        // Disable the filter of the column
        $this->setFilterable(false);
        $this->setOrder(false);
    }

    /**
     * @return string
     */
    public function getType()
    {
        return 'wallet';
    }
}
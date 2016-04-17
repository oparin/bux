<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/4/15
 * Time: 12:00 PM
 */

namespace Bux\AccountBundle\Form\Type\Referrals;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class BuyReferralsFormType
 *
 * @package Bux\AccountBundle\Form\Type\Referrals
 */
class BuyReferralsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('package', 'entity', array(
                'class'         => 'BuxAdminSetupBundle:BuyReferralsSettingsPackages',
                'property'      => 'referrals',
                'empty_value'   => '',
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'buy_referrals_form_type';
    }
}
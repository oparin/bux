<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/23/15
 * Time: 12:58 PM
 */

namespace Bux\OfficeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class FundsTransferFormType
 *
 * @package Bux\OfficeBundle\Form\Type
 */
class FundsTransferFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('sum', 'money', array(
                'currency'  => 'USD',
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'funds_transfer_form_type';
    }
}